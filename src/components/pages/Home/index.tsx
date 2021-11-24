import React, { ReactElement, useEffect, useState } from 'react'
import AssetList from '../../organisms/AssetList'
import Button from '../../atoms/Button'
import {
  generateBaseQuery,
  getFilterTerm,
  queryMetadata
} from '../../../utils/aquarius'
import Permission from '../../organisms/Permission'
import { DDO, Logger } from '@oceanprotocol/lib'
import { useUserPreferences } from '../../../providers/UserPreferences'
import styles from './index.module.css'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { useCancelToken } from '../../../hooks/useCancelToken'
import { SearchQuery } from '../../../models/aquarius/SearchQuery'
import {
  SortDirectionOptions,
  SortOptions,
  SortTermOptions
} from '../../../models/SortAndFilters'
import { useAddressConfig } from '../../../hooks/useAddressConfig'
import { BaseQueryParams } from '../../../models/aquarius/BaseQueryParams'
import { PagedAssets } from '../../../models/PagedAssets'
import Header from './Header'
import Intro from './Intro'
import Topics from './Topics'
import Partners from './Partners'

function sortElements(items: DDO[], sorted: string[]) {
  items.sort(function (a, b) {
    return (
      sorted.indexOf(a.dataToken.toLowerCase()) -
      sorted.indexOf(b.dataToken.toLowerCase())
    )
  })
  return items
}

function SectionQueryResult({
  title,
  query,
  action,
  queryData
}: {
  title: ReactElement | string
  query: SearchQuery
  action?: ReactElement
  queryData?: string[]
}) {
  const { chainIds } = useUserPreferences()
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState<boolean>()
  const isMounted = useIsMounted()
  const newCancelToken = useCancelToken()
  useEffect(() => {
    async function init() {
      if (chainIds.length === 0) {
        const result: PagedAssets = {
          results: [],
          page: 0,
          totalPages: 0,
          totalResults: 0
        }
        setResult(result)
        setLoading(false)
      } else {
        try {
          setLoading(true)
          const result = await queryMetadata(query, newCancelToken())
          if (!isMounted()) return
          if (queryData && result?.totalResults > 0) {
            const sortedAssets = sortElements(result.results, queryData)
            const overflow = sortedAssets.length - 9
            sortedAssets.splice(sortedAssets.length - overflow, overflow)
            result.results = sortedAssets
          }
          setResult(result)
          setLoading(false)
        } catch (error) {
          Logger.error(error.message)
        }
      }
    }
    init()
  }, [chainIds.length, isMounted, newCancelToken, query, queryData])

  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      <AssetList
        assets={result?.results}
        showPagination={false}
        isLoading={loading}
      />
      {action && action}
    </section>
  )
}

export default function HomePage(): ReactElement {
  const [queryLatest, setQueryLatest] = useState<SearchQuery>()
  const { chainIds } = useUserPreferences()
  const { featured, hasFeaturedAssets } = useAddressConfig()

  useEffect(() => {
    const queryParams = {
      esPaginationOptions: {
        size: hasFeaturedAssets() ? featured.length : 9
      },
      filters: hasFeaturedAssets() ? [getFilterTerm('id', featured)] : undefined
    }

    const baseParams = {
      ...queryParams,
      chainIds: chainIds,
      sortOptions: {
        sortBy: SortTermOptions.Created,
        sortDirection: SortDirectionOptions.Ascending
      } as SortOptions
    } as BaseQueryParams

    const latestOrFeaturedQuery = generateBaseQuery(baseParams)

    setQueryLatest(latestOrFeaturedQuery)
  }, [chainIds])

  return (
    <>
      <Intro />
      <Header />
      <Topics />
      <Partners />
      <Permission eventType="browse">
        <>
          {queryLatest && (
            <SectionQueryResult
              title={
                hasFeaturedAssets() ? 'Featured Assets' : 'Recently Published'
              }
              query={queryLatest}
              action={
                <Button style="text" to="/search?sort=created&sortOrder=desc">
                  All data sets and algorithms →
                </Button>
              }
            />
          )}
        </>
      </Permission>
    </>
  )
}

// import { Link } from "@tanstack/react-router"
import { useCallback } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { useIsFetching } from "@tanstack/react-query"
import clsx from "clsx"
import type { SourceID } from "@shared/types"
// import { Homepage, Version } from "@shared/consts"
import { NavBar } from "../navbar"
import { Menu } from "./menu"
import { currentSourcesAtom, goToTopAtom, refetchSourcesAtom } from "~/atoms"

function GoTop() {
  const { ok, fn: goToTop } = useAtomValue(goToTopAtom)
  return (
    <button
      type="button"
      title="Go To Top"
      className={clsx("i-ph:arrow-fat-up-duotone", ok ? "op-50 btn" : "op-0")}
      onClick={goToTop}
    />
  )
}

function Refresh() {
  const currentSources = useAtomValue(currentSourcesAtom)
  const setRefetchSource = useSetAtom(refetchSourcesAtom)
  const refreshAll = useCallback(() => {
    const obj = Object.fromEntries(currentSources.map(id => [id, Date.now()]))
    setRefetchSource(prev => ({
      ...prev,
      ...obj,
    }))
  }, [currentSources, setRefetchSource])

  const isFetching = useIsFetching({
    predicate: (query) => {
      return currentSources.includes(query.queryKey[0] as SourceID)
    },
  })

  return (
    <button
      type="button"
      title="Refresh"
      className={clsx("i-ph:arrow-counter-clockwise-duotone btn", isFetching && "animate-spin i-ph:circle-dashed-duotone")}
      onClick={refreshAll}
    />
  )
}

export function Header() {
  return (
    <>
      <span className="flex">
        热点
      </span>
      <span className="justify-self-center">
        <span className="hidden md:(inline-block)">
          <NavBar />
        </span>
      </span>
      <span className="justify-self-end flex gap-2 items-center text-xl text-primary-600 dark:text-primary">
        <GoTop />
        <Refresh />
        <Menu />
      </span>
    </>
  )
}

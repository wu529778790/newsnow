import { Homepage } from "@shared/consts"
import clsx from "clsx"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useHoverDirty } from "react-use"
import { useDark } from "~/hooks/useDark"
import { useLogin } from "~/hooks/useLogin"

function ThemeToggle() {
  const { isDark, toggleDark } = useDark()
  return (
    <li onClick={toggleDark}>
      <span className={clsx("inline-block", isDark ? "i-ph-moon-stars-duotone" : "i-ph-sun-dim-duotone")} />
      <span>
        {isDark ? "黑暗模式" : "白天模式"}
      </span>
    </li>
  )
}

export function Menu() {
  const { loggedIn, login, logout, userInfo } = useLogin()
  const [shown, show] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isHover = useHoverDirty(ref)
  useEffect(() => {
    show(isHover)
  }, [shown, isHover])
  return (
    <span ref={ref} className="relative">
      <span className="flex items-center scale-90">
        {
          loggedIn && userInfo.avatar
            ? (
                <button
                  type="button"
                  className="h-6 w-6 rounded-full bg-cover"
                  style={
                    {
                      backgroundImage: `url(${userInfo.avatar})`,
                    }
                  }
                >
                </button>
              )
            : <button type="button" className="btn i-si:more-muted-horiz-circle-duotone" />
        }
      </span>
      {shown && (
        <div className="absolute right-0 z-99 bg-transparent pt-8 top-0">
          <motion.div
            id="dropdown-menu"
            className={clsx([
              "w-200px",
              "bg-primary backdrop-blur-5 bg-op-70! rounded-lg shadow-xl",
            ])}
            initial={{
              scale: 0.9,
            }}
            animate={{
              scale: 1,
            }}
          >
            <ol className="bg-base bg-op-70! backdrop-blur-md p-2 rounded-lg color-base text-base">
              {loggedIn
                ? (
                    <li onClick={logout}>
                      <span className="i-ph:sign-out-duotone inline-block" />
                      <span>退出登录</span>
                    </li>
                  )
                : (
                    <li onClick={login}>
                      <span className="i-ph:sign-in-duotone inline-block" />
                      <span>Github 账号登录</span>
                    </li>
                  )}
              <ThemeToggle />
              <li onClick={() => window.open(Homepage)}>
                <span className="i-ph:github-logo-duotone inline-block" />
                <span>Star on Github </span>
              </li>
            </ol>
          </motion.div>
        </div>
      )}
    </span>
  )
}

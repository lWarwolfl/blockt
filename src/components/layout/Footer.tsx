import { Icon } from "@iconify-icon/react";

export default function Footer() {
  return (
     <div className="flex items-center gap-2">
        <div className="pointer-events-none flex place-items-center gap-2 font-mono text-sm font-black sm:hidden">
           <Icon icon="cryptocurrency:etc" className="text-2xl" /> BlockT
        </div>

        <div className="flex w-full max-w-5xl items-center justify-center gap-2 text-center font-mono text-sm">
           Developed by
           <a href="https://github.com/lWarwolfl" target="_blank" className="flex items-center">
              <Icon icon="bxl:github" className="text-lg" />
              lWarwolfl
           </a>
        </div>
     </div>
  )
}

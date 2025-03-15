import { toast } from 'sonner'
import { useRef, useState } from 'react'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  content: string
  disabled?: boolean
}

export const ShareButton = ({ content, disabled }: ShareButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const onCopy = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsCopied(true)
    await navigator.clipboard.writeText(content)
    toast.success('Copied to clipboard')

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 1500)
  }

  return (
    <Button
      size="icon"
      type="button"
      onClick={onCopy}
      variant="outline"
      disabled={disabled || isCopied}
      className="absolute top-1 right-1 dark:bg-neutral-900 dark:hover:bg-neutral-800 shrink-0 rounded-none cursor-pointer hidden group-hover:flex"
    >
      {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
    </Button>
  )
}

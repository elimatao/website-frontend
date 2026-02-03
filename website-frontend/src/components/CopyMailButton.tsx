'use client'
import { Mail, Copy, Check, Link } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function EmailButton({encodedEmail}: {encodedEmail: string}) {
  const t = useTranslations('Navigation')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(atob(encodedEmail))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const decodeMail = (e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget
    
    // Only decode if we haven't already
    if (!link.href.includes('mailto:')) {
      const decoded = atob(encodedEmail)
      link.href = `mailto:${decoded}`
    }
  }

  return (
    <div className='flex gap-2'>
        {/* The Mail Icon/Link */}
        <a href="#"
          onMouseEnter={decodeMail}
          onClick={decodeMail}
          onFocus={decodeMail}
          aria-label="Send me an email"
          className=""
        >
            <Button size="icon" variant="outline" className='hover:cursor-pointer'>
                <Mail className=""/>
            </Button>
        </a>

        {/* The "Copy" Utility - solves the mailto: annoyance */}
        <Button 
            onClick={handleCopy}
            variant="outline"
            className="flex items-center gap-1 hover:cursor-pointer"
        >
            {copied ? <Check className="" /> : <Copy className="" />}
            {copied ? t('email_copied') : t('copy_email')}
        </Button>
    </div>
  )
}
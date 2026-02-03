import { Github, Youtube } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from '@/i18n/routing'
import CopyMailButton from './CopyMailButton'
export default function ContactLinks() {
    return (
        <div className="flex justify-around gap-2">
            <CopyMailButton encodedEmail="aW5mby5lbGlhQGRvdW1lcmMubWU="/>
            <Link href="https://github.com/elimatao" target="_blank">
                <Button size="icon" variant="outline" className="hover:cursor-pointer">
                    <Github />
                </Button>
            </Link>
            <Link href="https://www.youtube.com/@EliaDoumerc" target="_blank" aria-label="YouTube">
                <Button size="icon" variant="outline" className="hover:cursor-pointer">
                    <Youtube />
                </Button>
            </Link>
        </div>
    )
}
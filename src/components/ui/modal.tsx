'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    function handleOpenChange() {
        router.back()
    }

    return (
        <Dialog.Root defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <Dialog.Overlay className="fixed inset-0 bg-gray-800/75" />
            <Dialog.Content className="scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-700 fixed top-0 right-0 h-full w-[660px] overflow-y-scroll bg-gray-800 px-12 py-16">
                <Dialog.Title hidden />
                {children}
            </Dialog.Content>
        </Dialog.Root>
    )
}

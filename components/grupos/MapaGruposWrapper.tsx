'use client'

import dynamic from 'next/dynamic'

const MapaGrupos = dynamic(() => import('@/components/grupos/MapaGrupos'), {
    ssr: false,
    loading: () => (
        <div className="h-[450px] rounded-[1.5rem] bg-soft/30 border border-soft flex items-center justify-center animate-pulse">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">A carregar mapa...</p>
        </div>
    )
})

export default function MapaGruposWrapper({ grupos }: { grupos: any[] }) {
    return <MapaGrupos grupos={grupos} />
}

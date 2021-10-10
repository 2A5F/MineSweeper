import { useEffect, useRef, useState } from 'react'
import './Bar.scss'

export type Face = 'normal' | 'click' | 'dead' | 'won'

export default function Bar({ onRestart, face, last, startTime, endTime }: {
    onRestart(): void
    face: Face
    last: number
    startTime: Date | null
    endTime: Date | null
}) {
    return <div className='bar flex justify-between items-center'>
        <Num n={last} />
        <Face onRestart={onRestart} face={face} />
        <TimeNum startTime={startTime} endTime={endTime} />
    </div>
}

function Face({ onRestart, face }: { onRestart(): void, face: Face }) {
    return <div className={`face ${face}`} onClick={onRestart}></div>
}

function Num({ n }: { n: number }) {
    const s = `${n | 0}`.padStart(3, '0')

    return <div className='num flex'>
        <NumItem n={s[0] ?? 0} />
        <NumItem n={s[1] ?? 0} />
        <NumItem n={s[2] ?? 0} />
    </div>
}

function NumItem({ n }: { n?: number | string }) {
    return <div className='num-item'>
        {n != null ? <div className={`n n-${n}`}></div> : null}
    </div>
}

function TimeNum({ startTime, endTime }: {
    startTime: Date | null
    endTime: Date | null
}) {
    const [data] = useState({
        startTime, endTime
    })
    data.startTime = startTime
    data.endTime = endTime
    const aid = useRef(0)
    const [time, setTime] = useState(0)
    useEffect(() => {
        const f = () => {
            aid.current = requestAnimationFrame(f)
            const { startTime, endTime } = data
            if (startTime == null || endTime != null) return
            const now = new Date
            console.log(now, startTime)
            const ntime = (now.getTime() - startTime.getTime()) / 1000
            if (ntime != time) setTime(ntime)
        }
        f()
        return () => {
            cancelAnimationFrame(aid.current)
        }
    }, [])

    if (startTime == null) return <Num n={0} />
    if (endTime != null) return <Num n={(endTime.getTime() - startTime.getTime()) / 1000} />
    return <Num n={time} />
}

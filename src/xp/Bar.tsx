import './Bar.scss'

export type Face = 'normal' | 'click' | 'died' | 'win'

export default function Bar({ onRestart, face }: { onRestart(): void, face: Face }) {
    return <div className='bar flex justify-between items-center'>
        <Num />
        <Face onRestart={onRestart} face={face} />
        <Num />
    </div>
}

function Face({ onRestart, face }: { onRestart(): void, face: Face }) {
    return <div className={`face ${face}`} onClick={onRestart}></div>
}

function Num() {
    return <div className='num flex'>
        <NumItem n={0} />
        <NumItem n={0} />
        <NumItem n={0} />
    </div>
}

function NumItem({ n }: { n?: number }) {
    return <div className='num-item'>
        {n != null ? <div className={`n n-${n}`}></div> : null}
    </div>
}

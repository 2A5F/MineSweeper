import './Bar.scss'

export default function Bar({ onRestart }: { onRestart(): void }) {
    return <div className='bar flex justify-between items-center'>
        <Num />
        <Face onRestart={onRestart} />
        <Num />
    </div>
}

function Face({ onRestart }: { onRestart(): void }) {
    return <div className='face' onClick={onRestart}></div>
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

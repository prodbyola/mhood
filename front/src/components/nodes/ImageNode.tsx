export default function ImageNode(props: {src: string}){
    return (
        <img className='image-node' src={props.src} alt='' />
    )
}
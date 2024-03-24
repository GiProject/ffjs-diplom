export default function FormImage(props: {image: File, key: number}) {
    console.log(URL.createObjectURL(props.image), props.key);
    return
}
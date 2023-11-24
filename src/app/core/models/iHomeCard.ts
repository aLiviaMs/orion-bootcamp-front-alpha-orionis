export interface IHomeCard {
    title: string,
    paragraph: string,
    img: string,
    imgAlt: string,
    className: string,
    callback: (args: string) => void,
}
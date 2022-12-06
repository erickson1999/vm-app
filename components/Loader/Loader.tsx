import LoaderStyles from "./Loader.module.css"

export const Loader = () => {
    return (
        <div className={LoaderStyles["lds-facebook"]}><div></div><div></div><div></div></div>
    )
}

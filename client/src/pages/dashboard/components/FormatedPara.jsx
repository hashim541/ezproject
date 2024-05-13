function FormatedPara ({para,class_name}){
    const splitPara = para.split('\n')
    return(
        <div>
            {splitPara.map(eachLine => (
                <p className={class_name}>{eachLine}</p>
            ))}
        </div>
    )
}
export default FormatedPara
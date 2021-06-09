const phoneFormat = (phone: string) => {
    try {
        return phone.replace(/(^02.{0}|^01.{1}|^[0-9]{3})([0-9]*)([0-9]{4})/, "$1-$2-$3")
    } catch (error) {
        return phone
    }

}

export default phoneFormat
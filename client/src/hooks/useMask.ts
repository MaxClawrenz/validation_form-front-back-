import { ChangeEvent, useState } from "react"

function useMask(value: string){
    const [phone, setPhone] = useState<string>(value);
    const MAX_PHONE_LENGTH = 8;

    function onChange(event: ChangeEvent<HTMLInputElement>){
    
        const newCleanPhoneArr = event.target.value.replace(/-/g, '').split('');
        const isDeleted = newCleanPhoneArr.length === phone.replace(/-/g,'').length;

        const PhoneWhithMask = newCleanPhoneArr
        .reduce((accum: string, element: string, index: number) => {
            if (!isNaN(parseInt(element, 10))) {
            if((index + 1) % 2 === 0 && !isDeleted){
                return accum += element + '-';
            }else if(isDeleted){
                return accum = phone.substring(0, phone.length -2);
            }else{
                return accum += element
            }
            }
            return accum
        }, '');
        
        setPhone(PhoneWhithMask.substring(0, MAX_PHONE_LENGTH));
    }

    return {
        phone,
        onChange
    }

}

export default useMask
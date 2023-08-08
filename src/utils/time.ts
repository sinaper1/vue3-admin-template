//获取当前时间属于哪个时间段
export const getTime = () => {
//  内置构造函数Date
    let hours:number = new Date().getHours();
    let message:string = '';
    if(hours<=9){
        message='早上';
    } else if(hours<=12){
        message='上午';
    } else if(hours<=18){
        message='下午';
    } else {
        message='晚上';
    }
    return message;
}
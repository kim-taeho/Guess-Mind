export function handleMessageNotif(data){
    const { message, nickname } = data;
    console.log(`${nickname} said ${message}`);
}
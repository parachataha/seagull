export default function generateFileName(user_id : number, name : string, use : string, extension : string) : string {

    const now = new Date()
    const yyyyMMdd = now.toISOString().split('T')[0].replace(/-/g, ''); // "20250316"
    const HHmmss = now.toTimeString().split(' ')[0].replace(/:/g, ''); // "143045"

    return `${user_id}_${use}_${name}_${yyyyMMdd}_${HHmmss}${extension}`;

}
export default function cn(...classess){
    return classess.filter(Boolean).join(' ')
}
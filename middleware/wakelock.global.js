export default defineNuxtRouteMiddleware((to, from) => {
    const { $releaseWakeLock, $startWakeLock } = useNuxtApp()
    if ( to.name === 'routine-name' && from.name !== 'routine-name' ) {
        $startWakeLock()
    } else if ( from.name === 'routine-name' ) {
        $releaseWakeLock()
    }
})
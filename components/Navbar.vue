<template>
    <div class="h-20 bg-cyan-50">
        <div class="fixed w-full top-0 py-2">
            <nav
                class="w-[96%] md:w-[80%] relative max-w-5xl mx-auto h-16 bg-white flex justify-between items-center shadow-md rounded-full z-50 px-2 md:px-4 gap-4">
                <div class="flex flex-shrink gap-2">
                    <NuxtLink to="/">
                        <div class="bg-sky-700 h-14 w-14 rounded-full" />
                    </NuxtLink>
                    <UButton variant="ghost" square class="flex md:hidden rounded-full w-14 h-14 justify-center" size="xl"
                        icon="i-heroicons-bars-3" @click="isMenuOpen = true" />
                </div>
                <div class="hidden md:flex gap-8">
                    <NavLink v-for="link in links" :to="link.to">{{ link.label }}</NavLink>
                </div>

                <Button>
                    Zur Anmeldung
                </Button>
            </nav>
        </div>

        <USlideover v-model="isMenuOpen">
            <div class="p-4 flex-1">
                <UButton variant="ghost" square class="rounded-full w-14 h-14 flex justify-center mb-4" size="xl"
                    icon="i-heroicons-x-mark" @click="isMenuOpen = false" />
                <UVerticalNavigation :links="links" />
            </div>
        </USlideover>
    </div>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const links = [
    {
        label: 'Über mich',
        to: '/'
    },
    {
        label: 'Leistungen',
        to: '/about'
    },
    {
        label: 'Kurse',
        to: '/contact'
    }
]


function hideAndShowNavOnScroll() {
    let lastScrollTop = 0
    const navbar = document.querySelector('nav')
    if (!navbar) return

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop

        if (scrollTop > lastScrollTop) {
            navbar.classList.add('opacity-0')
        } else {
            navbar.classList.remove('opacity-0')
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    })



}

onMounted(() => {
    hideAndShowNavOnScroll()
})

</script>

<style scoped lang="scss">
nav {
    transition: all .25s ease-in-out;
}
</style>
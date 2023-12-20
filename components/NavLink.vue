<template>
    <NuxtLink :to="to" exact-active-class="active" class="text-sky-700 hover:underline">
        <slot />

    </NuxtLink>
</template>

<script setup lang="ts">

export type Props = {
    to: string
}

withDefaults(defineProps<Props>(), {
    to: '/'
})
</script>
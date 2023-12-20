<template>
    <div class="bg-cyan-50 py-2">
        <nav class="w-[80%] mx-auto h-16 bg-white flex justify-between items-center shadow-md rounded-full z-10 px-4">
            <NuxtLink to="/">
                <div class="bg-sky-700 h-14 w-14 rounded-full" />
            </NuxtLink>
            <div class="flex gap-8">
                <NavLink to="/">Über mich</NavLink>
                <NavLink to="/about">Leistungen</NavLink>
                <NavLink to="/contact">Kurse</NavLink>
            </div>
            <Button>
                Zur Anmeldung
            </Button>
        </nav>
    </div>
</template>
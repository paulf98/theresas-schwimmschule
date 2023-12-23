<template>
    <div class="container mx-auto p-8 max-w-md border rounded-lg shadow-md">
        <h3 class="mb-4 text-2xl">Anmeldeformular</h3>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="submit">

            <h4 class="mb-4 !mt-8 text-xl">Kursteilnehmer/in</h4>
            <UFormGroup label="Name Kursteilnehmer/in" name="childName" eager-validation>
                <UInput v-model="state.childName" placeholder="Name Kursteilnehmer/in" />
            </UFormGroup>
            <div class="flex justify-between gap-4">
                <UFormGroup label="Vorhandene Schwimmabzeichen" name="childExperience" eager-validation class="flex-1">
                    <UInput v-model="state.childExperience" placeholder="Seepferdchen" />
                </UFormGroup>
                <UFormGroup label="Geburtsdatum" name="childBirthday" eager-validation>
                    <UInput type="date" v-model="state.childBirthday" placeholder="Geburtsdatum" />
                </UFormGroup>
            </div>

            <h4 class="mb-4 !mt-8 text-xl">Erziehungsberechtigte/r</h4>
            <UFormGroup label="Name Erziehungsberechtigte/r" name="parentName" eager-validation>
                <UInput v-model="state.parentName" placeholder="Name Erziehungsberechtigte/r" />
            </UFormGroup>
            <UFormGroup label="Telefonnummer" name="phone" eager-validation>
                <UInput v-model="state.phone" placeholder="Telefonnummer" />
            </UFormGroup>
            <UFormGroup label="E-Mail-Adresse" name="email" eager-validation>
                <UInput v-model="state.email" placeholder="E-Mail-Adresse" />
            </UFormGroup>
            <UFormGroup label="Ziel des Kurses" name="courseGoal" eager-validation>
                <USelect placeholder="Ziel des Kurses" v-model="state.courseGoal" :options="courseGoalOptions" />
            </UFormGroup>
            <div class="flex flex-col gap-4 items-start">
                <UButton type="submit" :disabled="!token"
                    class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full">Anmeldung senden
                </UButton>
                <NuxtTurnstile v-model="token" :options="{ theme: 'light' }" class="self-center" />
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const mail = useMail()
const toast = useToast()

const token = ref<string | undefined>(undefined)

function submit() {
    if (!mail || !token) {
        alert('Ihre Anmeldung konnte nicht versendet werden.')
        return
    }
    mail.send({
        from: state.parentName,
        subject: `Anmeldung Schwimmkurs: ${state.childName}`,
        text: `
        Es wurde ein neuer Schwimmkurs angemeldet.

        Name Erziehungsberechtigte/r: ${state.parentName}
        Name Kind: ${state.childName}
        Alter Kind: ${state.childBirthday}
        Erfahrung Kind: ${state.childExperience}
        Ziel des Kurses: ${state.courseGoal}
        Telefonnummer: ${state.phone}
        E-Mail-Adresse: ${state.email}
        `,
    }).then(() => {
        toast.add({
            title: 'Anmeldung versendet',
            description: 'Ihre Anmeldung wurde erfolgreich versendet.',
            color: 'green',
            timeout: 4000,
        })

    }).catch(() => {
        alert('Ihre Anmeldung konnte nicht versendet werden.')
    })

    // Reset form
    Object.assign(state, defaultState)
}

const CourseGoal = z.enum(["Wasservertrautheit", "Schwimmen lernen", "Technik verbessern", "Wettkampftraining"])
type CourseGoal = z.infer<typeof CourseGoal>;

const courseGoalOptions = [
    { label: "Wasservertrautheit", value: "Wasservertrautheit" },
    { label: "Schwimmen lernen", value: "Schwimmen lernen" },
    { label: "Technik verbessern", value: "Technik verbessern" },
    { label: "Wettkampftraining", value: "Wettkampftraining" },
]


const schema = z.object({
    parentName: z.string().min(1, { message: 'Bitte geben Sie den Namen des Erziehungsberechtigten an.' }),
    childName: z.string().min(1, { message: 'Bitte geben Sie den Namen des Kindes an.' }),
    childBirthday: z.string().min(1, { message: 'Bitte geben Sie das Geburtsdatum des Kindes an.' }),
    childExperience: z.string().min(1, { message: 'Bitte geben Sie die Erfahrung des Kindes an.' }),
    courseGoal: z.nativeEnum(CourseGoal.enum),
    phone: z.string().min(1, { message: 'Bitte geben Sie Ihre Telefonnummer an.' }),
    email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }),
})

const defaultState = reactive({
    parentName: undefined,
    childName: undefined,
    childAge: undefined,
    childExperience: undefined,
    courseGoal: undefined,
    phone: undefined,
    email: undefined,
})

const state = reactive({
    parentName: "John Doe",
    childName: "Harry Potter",
    childBirthday: 4,
    childExperience: "Seepferdchen",
    courseGoal: courseGoalOptions[0].value,
    phone: "123456",
    email: "test@example.com",
})
</script>
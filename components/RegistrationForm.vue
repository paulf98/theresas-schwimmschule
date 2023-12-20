<template>
    <div class="container mx-auto p-8 max-w-md">
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="submit">
            <div class="flex gap-8 justify-between">
                <UFormGroup label="Erziehungsberechtigte/r" name="parentName" eager-validation>
                    <UInput v-model="state.parentName" placeholder="Name Erziehungsberechtigte/r" />
                </UFormGroup>
                <UFormGroup label="Kind" name="childName" eager-validation>
                    <UInput v-model="state.childName" placeholder="Name Kind" />
                </UFormGroup>
            </div>
            <div class="flex justify-between gap-8">
                <UFormGroup label="Erfahrung Kind" name="childExperience" eager-validation class="flex-1">
                    <UInput v-model="state.childExperience" placeholder="Erfahrung Kind" />
                </UFormGroup>
                <UFormGroup label="Alter Kind" name="childAge" eager-validation class="flex-shrink w-20">
                    <UInput type="number" v-model="state.childAge" placeholder="Alter Kind" />
                </UFormGroup>
            </div>
            <UFormGroup label="Ziel des Kurses" name="courseGoal" eager-validation>
                <USelect placeholder="Ziel des Kurses" v-model="state.courseGoal" :options="courseGoalOptions" />
            </UFormGroup>
            <UFormGroup label="Telefonnummer" name="phone" eager-validation>
                <UInput v-model="state.phone" placeholder="Telefonnummer" />
            </UFormGroup>
            <UFormGroup label="E-Mail-Adresse" name="email" eager-validation>
                <UInput v-model="state.email" placeholder="E-Mail-Adresse" />
            </UFormGroup>
            <UButton type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Senden
            </UButton>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

function submit() {
    // send the form data to 
    console.log('submit')
    console.log(state)
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
    childAge: z.number().min(1, { message: 'Bitte geben Sie das Alter des Kindes an.' }),
    childExperience: z.string().min(1, { message: 'Bitte geben Sie die Erfahrung des Kindes an.' }),
    courseGoal: z.nativeEnum(CourseGoal.enum),
    phone: z.string().min(1, { message: 'Bitte geben Sie Ihre Telefonnummer an.' }),
    email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }),
})

// const state = reactive({
//     parentName: undefined,
//     childName: undefined,
//     childAge: undefined,
//     childExperience: undefined,
//     courseGoal: undefined,
//     phone: undefined,
//     email: undefined,
// })

const state = reactive({
    parentName: "test",
    childName: "test",
    childAge: 4,
    childExperience: "good",
    courseGoal: undefined,
    phone: "123456",
    email: "test@example.com",
})
</script>
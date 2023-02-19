<template>
    <nav
        id="nav-bar"
        class="w-full justify-center z-10 dark:bg-brown border-b-[0.5px]  dark:border-black  bg-[#F1F1F2] backdrop-blur-2xl backdrop-brightness-10 fixed h-[90px]  dark:text-white text-black  select-none"
        :class="{
            '': showBackButton == false,
        }"
        style="top: 0px; overscroll-behavior: none"
    >
        <div class="flex items-center ml-1 justify-center">
            <div
                id="back-button"
                v-if="showBackButton"
                class="mt-1 ml-2 transition duration-100 hover:-translate-x-1 pt-2"
                @click="goBack()"
            >
            <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.38281 14.2441C1.38281 14.5127 1.47949 14.749 1.68359 14.9531L10.2021 23.2783C10.3848 23.4717 10.6211 23.5684 10.9004 23.5684C11.459 23.5684 11.8887 23.1494 11.8887 22.5908C11.8887 22.3115 11.7705 22.0752 11.5986 21.8926L3.77832 14.2441L11.5986 6.5957C11.7705 6.41309 11.8887 6.16602 11.8887 5.89746C11.8887 5.33887 11.459 4.91992 10.9004 4.91992C10.6211 4.91992 10.3848 5.0166 10.2021 5.19922L1.68359 13.5352C1.47949 13.7285 1.38281 13.9756 1.38281 14.2441Z" fill="#007AFF"/>
</svg>
</div>
            <div
                style="white-space: nowrap"
                class="h-20 w-full place-content-between"
            >
                <div class="flex">
                    <!-- view title -->
                    <slot class="" name="navbar-title" />
                    <div class="self-center">
                        <!-- menu content at the top right -->
                        <slot name="navbar-content" />
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { useRouter } from "vue-router"

export default {
    name: "NavBar",
    props: {
        showBackButton: {
            type: Boolean,
            default: false,
        }
    },
    // eslint-disable-next-line
    setup(props) {
        const router = useRouter()
        const goBack = (): void => {
            router.push("/")
        }

        return {
            goBack,
        }
    },
}
</script>

<template>
    <button @click="$emit('clicked')" :style="{background: color}" class="btn">{{ text }}</button>
</template>

<script>
    export default {
        name: 'ButtonComp',
        props: {
            text: String,
            color: {
                type: String,
                default: "gray"
            }
        },
        methods: {
        }
    }
</script>
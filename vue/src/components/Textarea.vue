<template>
  <textarea
    ref="textarea"
    v-model="textValue"
    @input="resize"
    class="w-full p-1"
  ></textarea>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  text: String,
});

const emit = defineEmits(['update:modelValue', 'update:text', 'update:edited']);

const textValue = computed({
  get() {
    return props.text || props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
    emit('update:text', value);
    emit('update:edited', true);
  },
});

const textarea = ref(null);

const resize = () => {
  if (!textarea.value) return;
  textarea.value.style.height = 'auto';
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
};

watch(() => textValue.value, () => {
  nextTick(resize);
}, { immediate: true });

onMounted(() => {
  nextTick(() => {
    resize();
    setTimeout(resize, 50);
  });
});
</script>

<style>
textarea {
  overflow: hidden;
  resize: none;
}
</style>

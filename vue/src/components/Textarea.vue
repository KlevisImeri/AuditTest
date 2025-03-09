<template>
  <textarea
    ref="textarea"
    v-model="textValue"
    class="print:hidden p-1"
    :class="wfull ? 'w-full' : `w-${width}`"
    @input="resize"
    rows="1"
  ></textarea>
  <div class="hidden print:block whitespace-pre-wrap break-all p-1" >
    {{ textValue || '&nbsp;' }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onUnmounted } from 'vue';


const props = defineProps({
  modelValue: String,
  text: String,
  wfull: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 20 
  }
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
    setTimeout(resize, 51);
    window.addEventListener('resize', resize);
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
})
</script>

<style>
textarea {
  overflow: hidden;
  resize: none;
}
</style>

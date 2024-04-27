<template>
  <div class="hello">

  </div>
</template>

<script setup lang="ts">
import { 
  defineComponent,
  defineProps,
} from 'vue';
import WebSocket from 'ws';

const props = defineProps<{
  foo: string
  bar?: number
}>()

let helloWorld = "Hello World";

interface User {
  name: string;
  id: number;
}

const user: User = {
  username: "Hayes",
  id: 'lalala',
};

</script>


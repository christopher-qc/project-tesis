<template>
    <div class="carousel">
        <div class="carousel-inner" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
            <div v-for="(item, index) in items" :key="index" class="carousel-item">
                <img :src="item.logo_url" @error="handleImageError" alt="carousel item" />
            </div>
        </div>
        <button @click="prev" class="prev-button">Prev</button>
        <button @click="next" class="next-button">Next</button>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Carousel',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            activeIndex: 0,
        };
    },

    methods: {
        next() {
            this.activeIndex = (this.activeIndex + 1) % this.items.length;
            this.$emit('update-index', this.activeIndex);
        },
        prev() {
            this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
            this.$emit('update-index', this.activeIndex);
        },
        handleImageError(event) {
            event.target.src = 'https://acortar.link/ECCaUo';
        }
    }
}
</script>

<style scoped>
.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    max-width: 600px;
    margin: auto;
    border: 2px solid #ddd;
    border-radius: 10px;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
}

.carousel-item {
    min-width: 100%;
    box-sizing: border-box;
}

.carousel-item img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
}

button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 1000;
}

button:hover {
    background: rgba(0, 0, 0, 0.8);
}

.prev-button {
    left: 10px;
}

.next-button {
    right: 10px;
}
</style>

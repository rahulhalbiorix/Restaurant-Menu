<template>
  <div class="p-6 max-w-5xl mx-auto space-y-10">
    <!-- Page Title -->
    <div class="flex items-center gap-3">
      <i class="pi pi-shopping-cart text-red-600 text-4xl"></i>
      <h1 class="text-4xl font-extrabold text-gray-900">My Cart</h1>
    </div>

    <!-- Action -->
    <div v-if="CartItem.length" class="flex justify-end">
      <Button
        label="Clear Cart"
        icon="pi pi-trash"
        severity="danger"
        outlined
        size="small"
        @click="clearCart"
      />
    </div>

    <!-- Cart Items -->
    <div v-if="CartItem.length" class="space-y-8">
      <transition-group name="fade" tag="div" class="space-y-6">
        <div
          v-for="cart in CartItem"
          :key="cart._id"
          class="bg-white shadow-md border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6"
        >
          <!-- Image -->
          <img
            :src="cart.itemId?.image || cart.menuId?.image"
            alt="Cart Item"
            class="w-32 h-32 object-cover rounded-xl border flex-shrink-0"
            loading="lazy"
          />

          <!-- Details -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 leading-tight">
                {{ cart.itemId?.title || cart.menuId?.name }}
              </h2>
              <p class="text-sm text-gray-500 mt-1">
                {{ cart.itemId?.createdBy?.name }}
              </p>
            </div>

            <!-- Price + Quantity -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
              <!-- Price -->
              <div class="text-lg font-semibold text-gray-900">₹ {{ cart.price }}</div>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-3">
                <button
                  v-if="cart.itemId?._id"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  @click="deleteItemfromcart(cart.itemId?._id)"
                >
                  <i class="pi pi-minus text-sm"></i>
                </button>
                <button
                  v-if="cart.menuId?._id"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  @click="deleteCombofromcart(cart.menuId?._id)"
                >
                  <i class="pi pi-minus text-sm"></i>
                </button>

                <span class="w-8 text-center font-medium text-gray-900">
                  {{ cart.quantity }}
                </span>

                <button
                  v-if="cart.itemId?._id"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  @click="addItemtoCart(cart.itemId?._id)"
                >
                  <i class="pi pi-plus text-sm"></i>
                </button>
                <button
                  v-if="cart.menuId?._id"
                  class="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  @click="addMenutoCart(cart.menuId?._id)"
                >
                  <i class="pi pi-plus text-sm"></i>
                </button>
              </div>

              <!-- Subtotal -->
              <div class="text-gray-600 text-sm md:text-base">
                Subtotal:
                <span class="font-semibold"> ₹ {{ cart.price * cart.quantity }} </span>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Grand Total -->
      <div
        class="flex justify-between items-center bg-green-50 border border-green-300 rounded-2xl p-6"
      >
        <div class="text-xl font-extrabold text-green-700">Grand Total: ₹ {{ GrantTotal }}</div>
        <Button label="Checkout" icon="pi pi-check" severity="success" size="small" />
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center text-gray-400 text-xl py-20">
      <i class="pi pi-shopping-cart text-7xl mb-6"></i>
      <p>Your cart is empty</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { addItemCart, deleteCartItem, emptyCart, getCart } from '@/services/useApiServices'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/authStore'

const store = useAuthStore()

// ******cart item data ********

const CartItem = ref<any[]>([])
const GrantTotal = ref<number>(0)

// ********* fetch cart data ***********

const fetchCartDetail = async () => {
  try {
    const res = await getCart()

    if (res.data.success) {
      CartItem.value = res.data.data.items
      GrantTotal.value = res.data.data.totalAmount
      store.setCartItem(CartItem.value.length)
    }
  } catch (error) {
    console.log(error)
  }
}

// ******* delete entire cart data ********

const clearCart = async () => {
  try {
    const res = await emptyCart()

    if (res.data.success) {
      alert(res.data.message)
      fetchCartDetail()
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteItemfromcart = async (id: string) => {
  try {
    let payload = {
      itemId: id,
    }

    const res = await deleteCartItem(payload)

    if (res.data.success) {
      fetchCartDetail()
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteCombofromcart = async (id: string) => {
  try {
    let payload = {
      menuId: id,
    }

    const res = await deleteCartItem(payload)

    if (res.data.success) {
      fetchCartDetail()
    }
  } catch (error) {
    console.log(error)
  }
}

// *****add item *****

const addMenutoCart = async (id: string) => {
  try {
    const payload = {
      menuId: id,
      menuQuantity: 1,
    }

    const res = await addItemCart(payload)

    if (res.data.success) {
      fetchCartDetail()
    }
  } catch (error) {
    console.log(error)
  }
}

const addItemtoCart = async (id: string) => {
  try {
    const payload = {
      itemId: id,
      itemQuantity: 1,
    }

    const res = await addItemCart(payload)

    if (res.data.success) {
      fetchCartDetail()
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchCartDetail()
})
</script>

<style scoped>
/* Fade transition for cart items */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

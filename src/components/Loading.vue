<template>
  <div class="loading-overlay">
    <div class="loading-container">
      <div class="spinner"></div>
      <div class="loading-message">Cargando...</div>
    </div>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid #ccc;
  border-top: 6px solid #b22222; /* Rojo oscuro */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.loading-message {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

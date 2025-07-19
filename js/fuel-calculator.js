// Fuel Calculator for Xeremonia
// Formula: V(h) = L × W × h - (1/2) × triangle_base × min(h, triangle_height) × (min(h, triangle_height)/triangle_height) × L

// Tank dimensions from formel.txt
const TANK_DIMENSIONS = {
    L: 1.2,              // Length in meters
    W: 0.40,             // Width in meters
    triangle_base: 0.30,  // Triangle base in meters
    triangle_height: 0.35 // Triangle height in meters
};

// Maximum tank volume (when h = triangle_height + rectangular section)
const MAX_HEIGHT = TANK_DIMENSIONS.triangle_height + 0.65; // 1 meter total height
const MAX_VOLUME = calculateFuelVolume(MAX_HEIGHT * 100); // Convert to cm for calculation

function calculateFuelVolume(heightCm) {
    // Convert cm to meters
    const h = heightCm / 100;
    
    // Extract dimensions
    const { L, W, triangle_base, triangle_height } = TANK_DIMENSIONS;
    
    // Calculate rectangular volume: L × W × h
    const rectangularVolume = L * W * h;
    
    // Calculate triangular section volume
    const minHeight = Math.min(h, triangle_height);
    const triangleVolume = 0.5 * triangle_base * minHeight * (minHeight / triangle_height) * L;
    
    // Total volume = rectangular - triangular
    const totalVolume = rectangularVolume - triangleVolume;
    
    // Return volume in liters (convert from cubic meters)
    return Math.max(0, totalVolume * 1000);
}

function updateFuelDisplay(volume, percentage) {
    const fuelFill = document.getElementById('fuel-fill');
    const fuelVolume = document.getElementById('fuel-volume');
    const fuelPercentage = document.getElementById('fuel-percentage');
    
    // Update fuel bar
    fuelFill.style.width = `${percentage}%`;
    
    // Update text displays
    fuelVolume.textContent = `${volume.toFixed(2)} Liter`;
    fuelPercentage.textContent = `${percentage.toFixed(1)}%`;
    
    // Show result
    const result = document.getElementById('fuel-result');
    result.classList.add('show');
}

function calculateFuelLevel() {
    const heightInput = document.getElementById('fuel-height');
    const height = parseFloat(heightInput.value);
    
    if (isNaN(height) || height < 0) {
        alert('Bitte geben Sie eine gültige Höhe in cm ein.');
        return;
    }
    
    // Calculate volume
    const volume = calculateFuelVolume(height);
    
    // Calculate percentage
    const percentage = Math.min(100, (volume / MAX_VOLUME) * 100);
    
    // Update display
    updateFuelDisplay(volume, percentage);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-fuel');
    const heightInput = document.getElementById('fuel-height');
    
    // Calculate button click
    calculateButton.addEventListener('click', calculateFuelLevel);
    
    // Enter key press in input field
    heightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateFuelLevel();
        }
    });
    
    // Real-time calculation as user types (optional)
    heightInput.addEventListener('input', function() {
        const height = parseFloat(this.value);
        if (!isNaN(height) && height >= 0) {
            const volume = calculateFuelVolume(height);
            const percentage = Math.min(100, (volume / MAX_VOLUME) * 100);
            updateFuelDisplay(volume, percentage);
        }
    });
}); 
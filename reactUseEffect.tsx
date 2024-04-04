// A very simplified simulation of useEffect
class MyEffectManager {
    constructor() {
        this.effects = [];
        this.cleanup = [];
    }

    useEffect(callback, dependencies) {
        const index = this.effects.length;
        const hasChanged = this.hasDependenciesChanged(index, dependencies);
        if (hasChanged) {
            // Clean up previous effect if exists
            if (this.cleanup[index]) {
                this.cleanup[index]();
            }
            // Run the effect
            const cleanupFn = callback();
            // Store the cleanup function
            this.cleanup[index] = cleanupFn;
        }
        // Store the dependencies
        this.effects[index] = dependencies;
    }

    hasDependenciesChanged(index, dependencies) {
        if (!this.effects[index]) return true; // effect has not run before
        return dependencies.some((dep, i) => dep !== this.effects[index][i]);
    }
}

// Usage example outside of React
const effectManager = new MyEffectManager();

function myComponentRender() {
    effectManager.useEffect(() => {
        console.log("Effect ran");
        // Simulate cleanup function
        return () => console.log("Cleanup");
    }, [/* dependencies */]);

    // Simulate render
    console.log("Render");
}

// Simulating initial render
myComponentRender();

// Simulating re-render with the same dependencies
// (Would not cause the effect to run again in React's useEffect)
myComponentRender();

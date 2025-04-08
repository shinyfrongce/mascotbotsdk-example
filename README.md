
# MascotBOT Demo

Example React app that demonstrates core capabilities of [MascotBOT](https://mascot.bot).

## License

This project is licensed under the Mascotbot License. See the [LICENSE](http://license.mascot.bot) file for more details.

## Getting started

### Prerequisites

Before running the project, ensure that the following libraries are installed, as they are required for the `mascotbot` package to work:

- `@rive-app/canvas`
- `@rive-app/react-canvas`

You can install them by running:

```shell
pnpm add @rive-app/canvas @rive-app/react-canvas
```

### Install dependencies

Once the prerequisites are installed, proceed to install the project dependencies:

```shell
pnpm install
```

### Run the project

Start the development server:

```shell
pnpm dev
```


# Mascotbot SDK Basic Usage Overview

Actual [Documentation](https://docs.mascot.bot) can be found here: https://docs.mascot.bot

## Setup

1. **Import mascotbot sdk npm package via** `pnpm install mascotbot-sdk-react-0.1.1.tgz` (in this repo it's included in `pnpm install`, but when used separately make sure it's installed)

2. **Wrap your application with `MascotProvider`:**

   ```typescript
   import { MascotProvider } from "@mascotbot-sdk/react";

   function App() {
     return (
       <MascotProvider>
         {/* Your application components */}
       </MascotProvider>
     );
   }
   ```

3. **Create a Rive instance and use `MascotClient`:**

   ```typescript
   import { useRive } from "@rive-app/react-canvas";
   import { MascotClient } from "@mascotbot-sdk/react";

   const rive = useRive({
     src: "your_rive_file_url",
     artboard: "YourArtboard",
     animations: "YourAnimation",
     stateMachines: "YourStateMachine",
     autoplay: true,
   });

   <MascotClient rive={rive}>
     <YourMascotComponent />
   </MascotClient>
   ```

4. **Implement your mascot component:**

   ```typescript
   import { useMascot, useMascotPlayback } from "@mascotbot-sdk/react";

   export function YourMascotComponent() {
     const { RiveComponent } = useMascot();
     const speechPlayback = useMascotPlayback();

     // Implement play and reset functions
   }
   ```
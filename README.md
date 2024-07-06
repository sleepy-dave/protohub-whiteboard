# Disclaimer: Discontinued. I found this old project on my harddrive but i'm not working on it anymore. 

# Protohub: Whiteboard 

A real-time collaborative whiteboard application built using Node.js, Express, and Socket.IO. This application allows multiple users to draw on a shared canvas in real-time, with only one user having drawing privileges at any given time.

## Features

- Real-time drawing synchronization across multiple users.
- Drawing tools with different colors.
- Clear canvas functionality.
- Step back functionality to remove the last drawing step.
- Enable and disable drawing privileges for users.
- Simple and intuitive user interface.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/protohub-whiteboard.git
    cd protohub-whiteboard
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the server:

    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Drawing

- Click on the "Start Drawing" button to enable drawing mode.
- Select a color from the available options.
- Use the slider to adjust the line width.
- Click and drag on the canvas to draw.

### Controls

- **Clear Canvas**: Clears the entire canvas.
- **Step Back**: Removes the last drawing step.
- **Color Buttons**: Change the color of the drawing tool.
- **Line Width Slider**: Adjust the thickness of the drawing line.

### Real-time Collaboration

- Only one user can draw at a time.
- Other users can view the drawing in real-time but cannot draw until they gain drawing privileges.
- If the current drawing user disconnects, the drawing privilege is passed to the next user.

## Project Structure

- `server.js`: The main server file that sets up the Express server and Socket.IO for real-time communication.
- `public/`: Contains the client-side files.
  - `index.html`: The main HTML file for the front-end.
  - `script.js`: The client-side JavaScript file that handles drawing and Socket.IO communication.
  - `style.css`: The main stylesheet (if needed).

## Dependencies

- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [jQuery](https://jquery.com/)
- [Bootstrap](https://getbootstrap.com/)

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project uses [Bootstrap](https://getbootstrap.com/) for styling.
- The drawing functionality is inspired by various online collaborative whiteboard tools.


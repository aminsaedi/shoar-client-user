import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "../App";
import { defaultMessage } from "../hooks/useMessage";

const city = "مونترال";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    city,
  }),
}));

let sendNewMessage: (message: string) => void;
const socketOnMethod = (name: string, callBack: (message: string) => void) => {
  if (name === "next") sendNewMessage = callBack;
};

jest.mock("socket.io-client", () => {
  const mSocket = {
    on: socketOnMethod,
    off: jest.fn(),
  };
  return { io: jest.fn(() => mSocket) };
});

describe("client of shoar app", () => {
  test("Should show the name of the city in the top section of page", async () => {
    render(<App />);
    const header = await screen.findByText(city);
    expect(header).toBeVisible();
  });

  test("should show default connection status screen in the footer section", async () => {
    render(<App />);
    const footer = await screen.findByText(/وضعیت اتصال:/i);
    expect(footer).toBeVisible();
  });

  test("Should Show default message if nothing is emitted yet", async () => {
    render(<App />);
    const result = await screen.findByText(defaultMessage);
    expect(result).toBeVisible();
  });

  test("Should show the correct message after calling on method", async () => {
    render(<App />);
    const shoar = "Zan Zendegi Azadi";
    act(() => {
      sendNewMessage(shoar);
    });
    const status = await screen.findByText(shoar);
    expect(status).toBeVisible();
  });
});

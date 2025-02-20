import Home from "@/app/page";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockPuppies = [
  {
    name: "Buddy",
    breed: "Golden Retriever",
    age: 2,
    photoUrl: "https://example.com/buddy.jpg",
    traits: ["Friendly", "Playful"],
  },
  {
    name: "Luna",
    breed: "Labrador Retriever",
    age: 3,
    photoUrl: "https://example.com/luna.jpg",
    traits: ["Loyal", "Energetic"],
  },
];

const server = setupServer(
  http.get("http://localhost:3000/puppies", () => {
   return HttpResponse.json(mockPuppies);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders puppy data correctly", async () => {
  render(<Home />);

  // expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText("Buddy")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText("Luna")).toBeInTheDocument());

  expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
  expect(screen.getByText("Labrador Retriever")).toBeInTheDocument();
  expect(screen.getByText("2 years old")).toBeInTheDocument();
  expect(screen.getByText("3 years old")).toBeInTheDocument();
  expect(screen.getByText("Friendly, Playful")).toBeInTheDocument();
  expect(screen.getByText("Loyal, Energetic")).toBeInTheDocument();
});

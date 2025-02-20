import PuppyPage from "@/app/[slug]/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { useParams } from "next/navigation";

const puppyResponse = {
  _id: "67b7a7aa593620a24c0210c7",
  name: "Rocky",
  age: 2,
  gender: "male",
  isVaccinated: true,
  isNeutered: true,
  size: "medium",
  breed: "bulldog",
  traits: ["Calm", "Good with kids"],
  photoUrl: "https://images.dog.ceo/breeds/kelpie/n02105412_2650.jpg",
};

const server = setupServer(
  http.get(`http://localhost:3000/puppies/67b7a7aa593620a24c0210c7`, () => {
    return HttpResponse.json(puppyResponse);
  })
);

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: jest.fn(),
}));

const mockedUseParams = useParams as jest.Mock;

describe("PuppyPage Component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("renders breed filter list", async () => {
    mockedUseParams.mockReturnValue({ slug: "67b7a7aa593620a24c0210c7" });
    render(
      <QueryClientProvider client={new QueryClient()}>
        <PuppyPage />
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText("Rocky")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getByText("2 years old • male")).toBeInTheDocument()
    );
  });
});

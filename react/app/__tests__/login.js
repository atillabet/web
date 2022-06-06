import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import Login from "../src/components/login";
import fetchMock from "jest-fetch-mock";

const data = {data: { password : "1",
              phone: "1"}};
fetchMock.enableMocks()

describe("Login", () => {
	it("render Login", () => {
		render(<Router><Login /></Router>);
		expect(screen.getByTestId("LoginForm")).toBeInTheDocument();
	});

	it("Login", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><Login /></Router>);
        });
		const submitBtn = screen.getByTestId("LoginForm").querySelector(".button");
		fireEvent.click(submitBtn);

		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/user/login", {
			method: "POST",
			body: JSON.stringify({
			  phone: "",
			  password: ""
			}),
			headers: {'Accept': 'application/json'}
		});
		await expect(fetch).toHaveBeenCalledTimes(1);
	});
});
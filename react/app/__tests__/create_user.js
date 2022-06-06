import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import CreateUser from "../src/components/CreateUser";
import fetchMock from "jest-fetch-mock";

const data = {data: "New User"};
fetchMock.enableMocks()

describe("CreateUser", () => {
	it("render CreateUser", () => {
		render(<Router><CreateUser /></Router>);
		expect(screen.getByTestId("CreateUserForm")).toBeInTheDocument();
	});

	it("Create user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><CreateUser /></Router>);
        });
		const submitBtn = screen.getByTestId("CreateUserForm").querySelector(".button");
		fireEvent.click(submitBtn);

		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/user", {
			method: "POST",
			body: JSON.stringify({
			  password: "",
			  phone: "",
			  lastName: "",
			  firstName: "",
			  email: ""
			}),
			headers: {'Accept': 'application/json'}
		});
		await expect(fetch).toHaveBeenCalledTimes(1);
	});
});
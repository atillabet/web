import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import Logout from "../src/components/logout";
import fetchMock from "jest-fetch-mock";

const data = {data: "New User"};
fetchMock.enableMocks()

describe("Logout", () => {
	it("render main", () => {
		render(<Router><Logout /></Router>)
	});

	it("Logout", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            <Router><Logout /></Router>
        });
        const token = localStorage.getItem('token');
		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/user/logout", {
			method: "GET",
			headers: {'Accept': 'application/json',
			'Authorization': 'Bearer '+ token}
		});
		await expect(fetch).toHaveBeenCalledTimes(1);
	});
});
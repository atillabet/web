import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";
import GetPurse from "../src/components/GetPurse";
import fetchMock from "jest-fetch-mock";

const data = {data: {firstName: "12"}};
fetchMock.enableMocks()

describe("GetPurse", () => {
	it("render GetPurse", () => {
		render(<Router><GetPurse /></Router>);
		expect(screen.getByTestId("GetPurseForm")).toBeInTheDocument();
	});

	it("GetPurse", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><GetPurse /></Router>);
        });

        const token = localStorage.getItem('token');
		await expect(fetch).toHaveBeenCalledWith("http://localhost:5000/purse", {
			method: "GET",
            headers: {'Accept': 'application/json',
		    'Authorization': 'Bearer '+ token
		    }
		});
		await expect(fetch).toHaveBeenCalledTimes(2);
	});
});
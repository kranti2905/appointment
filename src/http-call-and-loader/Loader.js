import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import AllUrls from "./allURL";
import { AuthContext } from "../context/AuthContext";

import { Modal, CircularProgress } from "@mui/material";

export const axiosCall = axios.create();

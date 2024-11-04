import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useLocation } from "react-router-dom";
import isEmpty from "../../validations/is-empty";
import axios from "axios";
import { apiUrl, ipfs_file_path, siteFeeAmount } from "../../config/config";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import subAddress from "../../utils/subAddress";
import dateUtils from "../../utils/dateUtils";
import CountDownDate from "./CountDownDate";
import {
  handleDetailLoading,
  handleBidLoading,
} from "../../actions/loadingActions";
import { handleBidForItem, handleBuyForItem } from "../../actions/bidActions";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const historydatas = [
  {
    id: 1,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE1ODM5ODk5NTQ5MjAiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCAxNywgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDI1NSwgMTcpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNTgzOTg5OTU0OTIwKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 2,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 3,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE1ODM5ODk5NTQ5MjAiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCAxNywgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDI1NSwgMTcpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNTgzOTg5OTU0OTIwKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 4,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 5,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE1ODM5ODk5NTQ5MjAiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCAxNywgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDI1NSwgMTcpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNTgzOTg5OTU0OTIwKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 6,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 1,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE1ODM5ODk5NTQ5MjAiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCAxNywgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDI1NSwgMTcpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNTgzOTg5OTU0OTIwKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 2,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 3,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE1ODM5ODk5NTQ5MjAiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCAxNywgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDI1NSwgMTcpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNTgzOTg5OTU0OTIwKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 4,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 5,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjE1ODM5ODk5NTQ5MjAiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMjU1LCAxNywgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDI1NSwgMTcpIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCMxNTgzOTg5OTU0OTIwKSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
  {
    id: 6,
    avatar:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgODAgODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSIgaWQ9IjgwMzc5NzA1ODA3NiI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9InJnYigyMDgsIDI1NSwgMCkiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDAsIDIwOCwgMjU1KSIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9InVybCgjODAzNzk3MDU4MDc2KSIgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIj48L3JlY3Q+CiAgPC9nPgo8L3N2Zz4=",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Detailpage = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [result, setResult] = useState({});
  const [existResult, setExistResult] = useState([]);
  const [bidsResult, setBidsResult] = useState([]);
  const [existBidResult, setExistBidResult] = useState({});
  const [currentDateFromAPI, setCurrentDateFromAPI] = useState("");
  const [relationResult, setRelationResult] = useState([]);
  const [highestBidAmount, setHighestBidAmount] = useState(0);
  const [placeBidValue, setPlaceBidValue] = useState(0);

  const [bidModalFlag, setBidModalFlag] = useState(false);
  const [buyModalFlag, setBuyModalFlag] = useState(false);
  const [bidModalItem, setBidModalItem] = useState({});
  const [buyModalItem, setBuyModalItem] = useState({});
  const [tabflag, setTabflag] = useState(true);
  const [bidflag, setBidflag] = useState(true);
  const [traitsflag, setTraitsflag] = useState(true);
  const [royalflag, setRoyalflag] = useState(true);
  const [detailflag, setDetailflag] = useState(true);
  const [convert_ETHToUSD_Price, setConvert_ETHToUSD_Price] = useState(0);

  const getInitialData = () => {
    if (!isEmpty(params.get("item"))) {
      props.handleDetailLoading(true);
      props.handleBidLoading(true);

      axios
        .post(apiUrl + "/api/nfts/getNFTItemByID", {
          id: params.get("item"),
        })
        .then((res) => {
          setResult(res.data);

          if (!isEmpty(res.data)) {
            axios
              .post(apiUrl + "/api/nfts/getNFTItemsbyCollectionID", {
                collectionID: res.data.collections._id,
              })
              .then((relationRes) => {
                setRelationResult(relationRes.data);

                axios
                  .post(apiUrl + "/api/salelists/getItemByNFTID", {
                    nftid: params.get("item"),
                  })
                  .then((nftRes) => {
                    setExistResult(nftRes.data.salelists);
                    setCurrentDateFromAPI(nftRes.data.currentDate);
                    props.handleDetailLoading(false);

                    if (!isEmpty(nftRes.data.salelists)) {
                      axios
                        .post(apiUrl + "/api/bids/getBidsBySaleListID", {
                          salelistid: nftRes.data.salelists[0]._id,
                        })
                        .then((bids) => {
                          setBidsResult(bids.data);
                          axios
                            .post(
                              apiUrl +
                                "/api/bids/getExistBidsBySaleListAndUserID",
                              {
                                salelistid: nftRes.data.salelists[0]._id,
                                userid: props.auth.user.id,
                              }
                            )
                            .then((existBid) => {
                              setExistBidResult(existBid.data);
                              props.handleBidLoading(false);
                            })
                            .catch((err) => {
                              props.handleBidLoading(false);
                              toast.error("API Network Error!");
                            });
                        })
                        .catch((err) => {
                          props.handleBidLoading(false);
                          toast.error("API Network Error!");
                        });
                    } else {
                      props.handleBidLoading(false);
                    }
                  })
                  .catch((err) => {
                    props.handleDetailLoading(false);
                    props.handleBidLoading(false);
                    toast.error("API Network Error!");
                  });
              })
              .catch((err) => {
                props.handleDetailLoading(false);
                props.handleBidLoading(false);
                toast.error("API Network Error!");
              });
          } else {
            axios
              .post(apiUrl + "/api/salelists/getItemByNFTID", {
                nftid: params.get("item"),
              })
              .then((nftRes) => {
                setExistResult(nftRes.data.salelists);
                setCurrentDateFromAPI(nftRes.data.currentDate);
                props.handleDetailLoading(false);

                if (!isEmpty(nftRes.data.salelists)) {
                  axios
                    .post(apiUrl + "/api/bids/getBidsBySaleListID", {
                      salelistid: nftRes.data.salelists[0]._id,
                    })
                    .then((bids) => {
                      setBidsResult(bids.data);
                      props.handleBidLoading(false);
                    })
                    .catch((err) => {
                      props.handleBidLoading(false);
                      toast.error("API Network Error!");
                    });
                } else {
                  props.handleBidLoading(false);
                }
              })
              .catch((err) => {
                props.handleDetailLoading(false);
                props.handleBidLoading(false);
                toast.error("API Network Error!");
              });
          }
        })
        .catch((err) => {
          props.handleDetailLoading(false);
          props.handleBidLoading(false);
          toast.error("API Network Error!");
        });
    }
  };

  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((response) => response.json())
      .then((data) => setConvert_ETHToUSD_Price(data.USD));
    getInitialData();
    window.scrollTo(0, 0);
  }, [location]);

  const handleBidModalClose = () => {
    setBidModalFlag(false);
  };

  const handleBuyModalClose = () => {
    setBuyModalFlag(false);
  };

  const handleBidModal = (itemResult) => {
    setBidModalFlag(true);
    setBidModalItem(itemResult);
  };

  const handleBuyModal = (itemResult) => {
    setBuyModalFlag(true);
    setBuyModalItem(itemResult);
  };

  const handleBuyOffer = (item) => {
    const paramData = {
      salelistid: item._id,
      biduserid: props.auth.user.id,
      bidamount: Number(
        Number(
          Number(item.price) + Number((item.price / 100) * siteFeeAmount)
        ).toFixed(4)
      ),
    };

    props.handleBuyForItem(paramData);
    setBuyModalFlag(false);
    getInitialData();
  };

  const handleBidOffer = (item) => {
    const paramData = {
      salelistid: item._id,
      biduserid: props.auth.user.id,
      bidamount: Number(
        Number(
          Number(placeBidValue) + Number((placeBidValue / 100) * siteFeeAmount)
        ).toFixed(4)
      ),
    };

    props.handleBidForItem(paramData);
    setBidModalFlag(false);
    getInitialData();
  };

  useEffect(() => {
    getMaxAmount(bidsResult);
  }, [bidsResult]);

  const getMaxAmount = async (aryResult) => {
    let highestBidPrice = 0;
    await aryResult.map((item) => {
      if (Number(item.bidamount) > highestBidPrice) {
        highestBidPrice = item.bidamount;
      }
    });
    setHighestBidAmount(highestBidPrice);
  };

  const handleRefreshPage = async () => {
    await getInitialData();
  };

  return (
    <div className="detailpage">
      {isEmpty(result) ? null : (
        <div className="main">
          <div className="lsection">
            <a
              href={ipfs_file_path + result.attach_file}
              target="_blank"
              className="image_view"
            >
              <div className="image_item">
                <img alt="item" src={ipfs_file_path + result.attach_file} />
              </div>
            </a>
          </div>
          <div className="rsection">
            <div className="subsection">
              <div className="detail-view">
                <Link
                  to={
                    "/explore?collection=" + isEmpty(result.collections)
                      ? ""
                      : result.collections._id
                  }
                  className="topic"
                >
                  {result.title}
                </Link>
                <h1 className="title">{result.title}</h1>
                <div className="content-detail">
                  <span className="detail-span1">
                    <span className="detail-span2">
                      <p>{result.description}</p>
                    </span>
                  </span>
                </div>
                <div className="currentowner">
                  <div className="ownersection">
                    <div className="owner">
                      <div className="owner-avatar">
                        <img
                          src={isEmpty(result.user) ? "" : result.user.avatar}
                          alt="avatar"
                        />
                      </div>
                      <div className="owner-address">
                        <span className="name">Current owner</span>
                        <a
                          href={
                            "https://etherscan.io/address/" +
                            result.user.address
                          }
                          className="address"
                          target="_blank"
                        >
                          {subAddress(
                            isEmpty(result.user) ? "" : result.user.address
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="owner-chat-view">
                    <Link to="/" className="owner-chat">
                      <i className="fab fa-rocketchat"></i>
                    </Link>
                  </div>
                </div>
                {!isEmpty(existResult) ? (
                  <div className="refresh-view">
                    <button type="button" onClick={handleRefreshPage}>
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        xlmns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.23809 4.18201C8.75159 3.765 8 4.11069 8 4.75145V6.47904C5.68008 7.21941 4 9.39245 4 11.9579C4 14.8411 6.12129 17.2274 8.88844 17.6437C9.29804 17.7053 9.68004 17.4232 9.74166 17.0136C9.80327 16.604 9.52117 16.222 9.11156 16.1604C7.06744 15.8529 5.5 14.0878 5.5 11.9579C5.5 10.2345 6.52574 8.75075 8 8.08376V9.2221C8 9.83213 8.68953 10.187 9.18593 9.8324L12.0309 7.80028C12.4272 7.51723 12.4528 6.93747 12.0831 6.62054L9.23809 4.18201ZM14.2583 6.9022C14.32 6.49259 14.702 6.21049 15.1116 6.2721C17.8787 6.68835 20 9.07471 20 11.9579C20 14.5233 18.3199 16.6964 16 17.4367V19.4144C16 20.0551 15.2484 20.4008 14.7619 19.9838L11.9169 17.5453C11.5472 17.2283 11.5728 16.6486 11.9691 16.3655L14.8141 14.3334C15.3105 13.9788 16 14.3337 16 14.9437V15.832C17.4743 15.165 18.5 13.6812 18.5 11.9579C18.5 9.82802 16.9326 8.0629 14.8884 7.75542C14.4788 7.6938 14.1967 7.3118 14.2583 6.9022Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <span>Refresh</span>
                    </button>
                  </div>
                ) : null}
              </div>
              {!isEmpty(existResult) ? (
                existResult[0].sale_type === 1 ? (
                  <div className="bid-detail-view">
                    <div className="bid-detail-subview">
                      <div className="bid-detail">
                        <span className="highest-bid-text">Price</span>
                        <div className="highest-bid-view">
                          <span className="highest-bid">
                            <span>{existResult[0].price} ETH</span>
                          </span>
                        </div>
                        <span className="highest-bid-currency">
                          ≈ $
                          {Number(
                            existResult[0].price * convert_ETHToUSD_Price
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="last-sale-view"></div>
                      <div className="place-bid-view">
                        {!props.auth.isAuthenticated ? (
                          <button type="button" disabled>
                            You must connect wallet
                          </button>
                        ) : existResult[0].soldout_flag ? (
                          <button type="button" disabled>
                            Sold Out
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleBuyModal(existResult[0])}
                          >
                            Buy Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bid-detail-view">
                    <div className="bid-detail-subview">
                      <div className="bid-detail">
                        <span className="highest-bid-text">Highest bid</span>
                        <div className="highest-bid-view">
                          <span className="highest-bid">
                            <span>
                              {isEmpty(bidsResult)
                                ? existResult[0].price
                                : highestBidAmount}{" "}
                              ETH
                            </span>
                          </span>
                        </div>
                        <span className="highest-bid-currency">
                          ≈ $
                          {Number(
                            Number(
                              Number(
                                isEmpty(bidsResult)
                                  ? existResult[0].price
                                  : highestBidAmount
                              ) * convert_ETHToUSD_Price
                            ).toFixed(4)
                          )}
                        </span>
                      </div>
                      <div className="last-sale-view">
                        <div className="last-sale-end-date">
                          Sale ends {dateUtils(existResult[0].expired_time)}
                        </div>
                        <div className="last-sale-auction-date">
                          <CountDownDate
                            currentDate={currentDateFromAPI}
                            expiredDate={existResult[0].expired_time}
                          />{" "}
                          Left
                        </div>
                      </div>
                      <div className="place-bid-view">
                        {!props.auth.isAuthenticated ? (
                          <button type="button" disabled>
                            You must connect wallet
                          </button>
                        ) : new Date(existResult[0].expired_time).getTime() -
                            new Date(currentDateFromAPI).getTime() <=
                          0 ? (
                          <button type="button" disabled>
                            Auction is ended
                          </button>
                        ) : !isEmpty(existBidResult) ? (
                          <button type="button" disabled>
                            You have already bid
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleBidModal(existResult[0])}
                          >
                            Place a bid
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}

      {isEmpty(result) ? null : (
        <div className="detail-his-view">
          <div className="detail-view">
            <div className="detail-tabs">
              <div className="detail-tab">
                <button
                  className={tabflag ? "active" : ""}
                  type="button"
                  onClick={() => setTabflag(true)}
                >
                  Details
                </button>
                <button
                  className={tabflag ? "" : "active"}
                  type="button"
                  onClick={() => setTabflag(false)}
                >
                  History
                </button>
              </div>
            </div>
            {tabflag ? (
              <div className="detail-main">
                <div className="detail-item-view">
                  <button
                    type="button"
                    className="accord-button"
                    onClick={() => setBidflag(!bidflag)}
                  >
                    <div className="accord-title">
                      <span>Bids</span>
                      {isEmpty(bidsResult) ? null : (
                        <div>{bidsResult.length}</div>
                      )}
                    </div>
                    <div className="accord-click">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        width="16"
                        height="16"
                        xlmns="http://www.w3.org/2000/svg"
                        style={
                          bidflag
                            ? { transform: "rotate(-180deg)" }
                            : { transform: "rotate(0deg)" }
                        }
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  {bidflag ? (
                    <div className="accord-content">
                      <div className="first-content">
                        <table>
                          <thead>
                            <tr>
                              <th>Bid Amount</th>
                              <th>Created Date</th>
                              <th>From</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isEmpty(bidsResult) ? (
                              <tr>
                                <td
                                  colSpan={3}
                                  style={{ textAlign: "center", fontSize: 22 }}
                                >
                                  No Bids
                                </td>
                              </tr>
                            ) : (
                              bidsResult
                                .sort(
                                  (a, b) =>
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                )
                                .map((item, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>
                                        {item.bidamount} ETH ≈ $
                                        {Number(
                                          Number(
                                            item.bidamount *
                                              convert_ETHToUSD_Price
                                          ).toFixed(4)
                                        )}
                                      </td>
                                      <td>{dateUtils(item.created_at)}</td>
                                      <td>
                                        {props.auth.user.address ===
                                        item.biduser.address
                                          ? "Me"
                                          : item.biduser.address.substring(
                                              0,
                                              5
                                            ) +
                                            "..." +
                                            item.biduser.address.substring(
                                              item.biduser.address.length - 4,
                                              item.biduser.address.length
                                            )}
                                      </td>
                                    </tr>
                                  );
                                })
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="detail-item-view">
                  <button
                    type="button"
                    className="accord-button"
                    onClick={() => setTraitsflag(!traitsflag)}
                  >
                    <div className="accord-title">
                      <span>Traits</span>
                      {result.levels.length +
                        result.properties.length +
                        result.stats.length >
                        0 && (
                        <div>
                          {result.levels.length +
                            result.properties.length +
                            result.stats.length}
                        </div>
                      )}
                    </div>
                    <div className="accord-click">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        width="16"
                        height="16"
                        xlmns="http://www.w3.org/2000/svg"
                        style={
                          traitsflag
                            ? { transform: "rotate(-180deg)" }
                            : { transform: "rotate(0deg)" }
                        }
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  {traitsflag ? (
                    <div className="accord-content">
                      <div className="first-content">
                        <table>
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.levels.length +
                              result.properties.length +
                              result.stats.length >
                            0 ? (
                              <>
                                <>
                                  {!isEmpty(result.levels) &&
                                    result.levels.map((item, key) => {
                                      return (
                                        <tr key={key}>
                                          <td>{item.name}</td>
                                          <td>{item.value}</td>
                                        </tr>
                                      );
                                    })}
                                </>
                                <>
                                  {!isEmpty(result.properties) &&
                                    result.properties.map((item, key) => {
                                      return (
                                        <tr key={key}>
                                          <td>{item.type}</td>
                                          <td>{item.name}</td>
                                        </tr>
                                      );
                                    })}
                                </>
                                <>
                                  {!isEmpty(result.stats) &&
                                    result.stats.map((item, key) => {
                                      return (
                                        <tr key={key}>
                                          <td>{item.name}</td>
                                          <td>{item.value}</td>
                                        </tr>
                                      );
                                    })}
                                </>
                              </>
                            ) : (
                              <tr>
                                <td
                                  colSpan={3}
                                  style={{ textAlign: "center", fontSize: 22 }}
                                >
                                  No Traits Data
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="detail-item-view">
                  <button
                    type="button"
                    className="accord-button"
                    onClick={() => setRoyalflag(!royalflag)}
                  >
                    <div className="accord-title">
                      <span>Royalties</span>
                      <div>7.5%</div>
                    </div>
                  </button>
                </div>
                <div className="detail-item-view">
                  <button
                    type="button"
                    className="accord-button"
                    onClick={() => setDetailflag(!detailflag)}
                  >
                    <div className="accord-title">
                      <span>Details</span>
                    </div>
                    <div className="accord-click">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        width="16"
                        height="16"
                        xlmns="http://www.w3.org/2000/svg"
                        style={
                          detailflag
                            ? { transform: "rotate(-180deg)" }
                            : { transform: "rotate(0deg)" }
                        }
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 11.4143L12.7071 6.7072C13.0976 6.31668 13.0976 5.68351 12.7071 5.29299C12.3166 4.90246 11.6834 4.90246 11.2929 5.29299L8 8.58588L4.70711 5.29299C4.31658 4.90246 3.68342 4.90246 3.29289 5.29299C2.90237 5.68351 2.90237 6.31668 3.29289 6.7072L8 11.4143Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  {detailflag ? (
                    <div className="accord-content">
                      <div className="second-content">
                        <a
                          href="https://etherscan.io/address/0x5ab21ec0bfa0b29545230395e3adaca7d552c948"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="eth-item"
                        >
                          <div>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              width="24"
                              height="24"
                              xlmns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_989_1157)">
                                <path
                                  d="M5.96732 11.0899C5.96732 10.9833 5.98839 10.8777 6.02934 10.7792C6.07028 10.6808 6.13029 10.5914 6.2059 10.5162C6.28151 10.441 6.37124 10.3815 6.46993 10.3411C6.56862 10.3007 6.67432 10.2802 6.78095 10.2808L8.12823 10.2845C8.23467 10.2845 8.34008 10.3054 8.43841 10.3462C8.53674 10.387 8.62608 10.4467 8.7013 10.522C8.77653 10.5973 8.83618 10.6867 8.87683 10.7851C8.91748 10.8835 8.93835 10.9889 8.93823 11.0954V16.1926C9.09004 16.1472 9.28459 16.0999 9.49823 16.0499C9.64625 16.0149 9.77812 15.931 9.87249 15.8117C9.96687 15.6924 10.0182 15.5448 10.0182 15.3926V9.06901C10.0182 8.85395 10.1037 8.64769 10.2557 8.49561C10.4078 8.34354 10.6141 8.2581 10.8291 8.2581H12.1791C12.2856 8.2581 12.391 8.27909 12.4893 8.31985C12.5877 8.36061 12.677 8.42036 12.7522 8.49567C12.8274 8.57098 12.8871 8.66038 12.9277 8.75876C12.9684 8.85714 12.9893 8.96257 12.9891 9.06901V14.9381C12.9891 14.9381 13.3273 14.8017 13.6564 14.6617C13.7788 14.61 13.8832 14.5233 13.9566 14.4125C14.03 14.3018 14.0691 14.1719 14.0691 14.039V7.04265C14.0691 6.9362 14.0901 6.8308 14.1309 6.73247C14.1716 6.63413 14.2314 6.5448 14.3067 6.46957C14.382 6.39434 14.4714 6.3347 14.5698 6.29405C14.6682 6.25339 14.7736 6.23253 14.88 6.23265H16.23C16.4449 6.23265 16.6509 6.31799 16.8028 6.46989C16.9547 6.6218 17.04 6.82782 17.04 7.04265V12.8036C18.211 11.9554 19.3973 10.9345 20.3382 9.70719C20.4751 9.52897 20.5656 9.31961 20.6018 9.09783C20.638 8.87605 20.6186 8.64876 20.5455 8.43629C19.9085 6.57951 18.7136 4.96475 17.1241 3.81271C15.5347 2.66068 13.6283 2.02757 11.6655 1.99992C6.37368 1.92992 2.00004 6.25174 2.00004 11.5463C1.99492 13.2216 2.43207 14.8686 3.26732 16.3208C3.38251 16.5195 3.552 16.6811 3.75587 16.7867C3.95974 16.8924 4.18952 16.9376 4.41823 16.9172C4.67277 16.8954 4.99095 16.8627 5.36914 16.819C5.53388 16.8005 5.68602 16.7219 5.79652 16.5983C5.90703 16.4747 5.96815 16.3148 5.96823 16.149V11.0899H5.96732ZM5.93823 19.2645C7.40655 20.3327 9.14926 20.9597 10.9616 21.0717C12.7739 21.1837 14.5806 20.7762 16.1693 19.8969C17.758 19.0176 19.0627 17.7032 19.9302 16.108C20.7977 14.5128 21.1919 12.7032 21.0664 10.8917C17.581 16.0926 11.1437 18.5245 5.93914 19.2645"
                                  fill="currentColor"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_989_1157">
                                  <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(2 2)"
                                  ></rect>
                                </clipPath>
                              </defs>
                            </svg>
                            <span>View on Etherscan</span>
                          </div>
                        </a>
                        <a
                          href={ipfs_file_path + result.attach_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="eth-item"
                        >
                          <div>
                            <svg
                              viewBox="0 0 25 24"
                              fill="none"
                              width="24"
                              height="24"
                              xlmns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.76156 11.4681C6.35983 10.6489 7.34833 9.45287 8.61566 8.46785C9.88623 7.48031 11.3779 6.75 13 6.75C14.6221 6.75 16.1138 7.48031 17.3843 8.46785C18.6517 9.45287 19.6402 10.6489 20.2384 11.4681C20.4743 11.791 20.4743 12.209 20.2384 12.5319C19.6402 13.3511 18.6517 14.5471 17.3843 15.5321C16.1138 16.5197 14.6221 17.25 13 17.25C11.3779 17.25 9.88623 16.5197 8.61566 15.5321C7.34833 14.5471 6.35983 13.3511 5.76156 12.5319C5.52572 12.209 5.52572 11.791 5.76156 11.4681ZM13 5.25C10.921 5.25 9.11112 6.18297 7.69514 7.28352C6.27592 8.38659 5.1929 9.70343 4.55021 10.5834C3.9295 11.4334 3.9295 12.5666 4.55021 13.4166C5.1929 14.2966 6.27592 15.6134 7.69514 16.7165C9.11112 17.817 10.921 18.75 13 18.75C15.079 18.75 16.8889 17.817 18.3049 16.7165C19.7241 15.6134 20.8071 14.2966 21.4498 13.4166C22.0705 12.5666 22.0705 11.4334 21.4498 10.5834C20.8071 9.70343 19.7241 8.38659 18.3049 7.28351C16.8889 6.18297 15.079 5.25 13 5.25ZM13 14C14.1046 14 15 13.1046 15 12C15 10.8954 14.1046 10 13 10C11.8954 10 11 10.8954 11 12C11 13.1046 11.8954 14 13 14Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <span>Open original on IPFS</span>
                          </div>
                        </a>
                        <a
                          href={ipfs_file_path + result.attach_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="eth-item"
                        >
                          <div>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              width="24"
                              height="24"
                              xlmns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.9573 4.9371C11.4515 4.18958 12.5486 4.18958 13.0427 4.93711L17.5761 11.7943L12.4924 13.973C12.178 14.1078 11.822 14.1078 11.5076 13.973L6.42393 11.7943L10.9573 4.9371ZM6.62079 13.5106L10.997 19.3946C11.4968 20.0666 12.5032 20.0666 13.003 19.3946L17.3793 13.5106L13.0833 15.3517C12.3915 15.6482 11.6085 15.6482 10.9167 15.3517L6.62079 13.5106ZM14.294 4.10987C13.2068 2.46533 10.7932 2.46533 9.70601 4.10987L5.14826 11.004C4.50963 11.97 4.54457 13.2325 5.23566 14.1617L9.79341 20.2898C10.893 21.7682 13.107 21.7682 14.2066 20.2898L18.7644 14.1617C19.4555 13.2325 19.4904 11.97 18.8518 11.004L14.294 4.10987Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <span>Open original on IPFS</span>
                          </div>
                        </a>
                        <a
                          href={ipfs_file_path + result.attach_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="eth-item"
                        >
                          <div>
                            <svg
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              xlmns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.23809 4.18201C8.75159 3.765 8 4.11069 8 4.75145V6.47904C5.68008 7.21941 4 9.39245 4 11.9579C4 14.8411 6.12129 17.2274 8.88844 17.6437C9.29804 17.7053 9.68004 17.4232 9.74166 17.0136C9.80327 16.604 9.52117 16.222 9.11156 16.1604C7.06744 15.8529 5.5 14.0878 5.5 11.9579C5.5 10.2345 6.52574 8.75075 8 8.08376V9.2221C8 9.83213 8.68953 10.187 9.18593 9.8324L12.0309 7.80028C12.4272 7.51723 12.4528 6.93747 12.0831 6.62054L9.23809 4.18201ZM14.2583 6.9022C14.32 6.49259 14.702 6.21049 15.1116 6.2721C17.8787 6.68835 20 9.07471 20 11.9579C20 14.5233 18.3199 16.6964 16 17.4367V19.4144C16 20.0551 15.2484 20.4008 14.7619 19.9838L11.9169 17.5453C11.5472 17.2283 11.5728 16.6486 11.9691 16.3655L14.8141 14.3334C15.3105 13.9788 16 14.3337 16 14.9437V15.832C17.4743 15.165 18.5 13.6812 18.5 11.9579C18.5 9.82802 16.9326 8.0629 14.8884 7.75542C14.4788 7.6938 14.1967 7.3118 14.2583 6.9022Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                            <span>Open original on IPFS</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="history-main">
                <div className="history-subview">
                  <div className="history-list">
                    {historydatas.map((item, key) => {
                      return (
                        <div className="list-items" key={key}>
                          <div className="list-item">
                            <Link to="/profile" className="list-item-avatar">
                              <img src={item.avatar} />
                            </Link>
                            <div className="list-item-detail">
                              <div className="list-item-top">
                                <div className="list-item-div-top">
                                  <a>0x5b2...29e2</a>
                                  <span>transfered to</span>
                                  <a>0x5b2...29e2</a>
                                </div>
                                <span className="list-item-span-bottom">
                                  0.4 ETH
                                </span>
                              </div>
                              <div className="list-item-bottom">
                                <span>Feb 26, 2023, 03:55 GMT+1</span>
                                <span>$847.15</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="relation-page">
        <h2 className="relation-title">You might also like</h2>
        <div className="relation-main">
          {isEmpty(relationResult) ? (
            <div className="empty-section">No Relation Datas</div>
          ) : (
            <Swiper
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                456: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1140: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={20}
              modules={[Navigation]}
              navigation={true}
              className="mySwiper"
            >
              {relationResult.map((item, key) => {
                return (
                  <SwiperSlide key={key}>
                    <Link
                      to={"/detail?item=" + item.nft._id}
                      className="sliderview"
                    >
                      <div className="collectionimage">
                        <img
                          src={ipfs_file_path + item.nft.attach_file}
                          alt="image"
                        />
                      </div>
                      <div className="collectionName">
                        <h3>{item.nft.title}</h3>
                      </div>
                      <div className="relationview">
                        <div className="view">
                          <div className="item">
                            <span className="firstpart">Price</span>
                            <span className="secondpart">{item.price} ETH</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
      <Dialog
        open={buyModalFlag}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"xs"}
        onClose={handleBuyModalClose}
      >
        <DialogContent>
          <div className="modal_header">
            <h3 className="title">BUY NOW</h3>
            <span className="subtitle">
              You are about to purchase{" "}
              <span>
                {!isEmpty(buyModalItem) ? buyModalItem.nft.title : ""}
              </span>
            </span>
          </div>
          <div className="modal_content">
            <div className="first-section">
              <span className="price-text">Price</span>
              <span>
                <span className="eth-price">
                  {!isEmpty(buyModalItem) ? buyModalItem.price : "---"} ETH
                </span>{" "}
                &nbsp;
                <span className="currency-price">
                  ≈ $
                  {!isEmpty(buyModalItem)
                    ? Number(
                        buyModalItem.price * convert_ETHToUSD_Price
                      ).toFixed(2)
                    : "---"}
                </span>
              </span>
            </div>
            <div className="second-section">
              <div className="fees-view">
                <span className="fees-sub-view">
                  <div className="fees-sub-div">
                    <span className="fees-text">Fees({siteFeeAmount}%)</span>
                    <button type="button" className="fees-button">
                      <svg
                        viewBox="0 0 8 12"
                        fill="none"
                        width="8"
                        height="8"
                        xlmns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.65936 7.67C4.65936 6.995 5.01936 6.605 5.54436 6.215L6.11436 5.795C7.01436 5.12 7.56936 4.295 7.56936 3.095C7.56936 1.595 6.35436 0.139999 3.92436 0.139999C1.73436 0.139999 0.429355 1.625 0.429355 3.38C0.429355 3.575 0.444355 3.8 0.489355 4.01L2.58936 4.085C2.57436 4.025 2.54436 3.875 2.54436 3.53C2.54436 2.825 3.05436 2.12 3.92436 2.12C4.82436 2.12 5.25936 2.69 5.25936 3.275C5.25936 3.665 5.12436 4.025 4.71936 4.325L3.95436 4.895C3.09936 5.54 2.81436 6.305 2.81436 7.01C2.81436 7.25 2.82936 7.46 2.87436 7.67H4.65936ZM2.52936 9.86C2.52936 10.565 3.09936 11.15 3.81936 11.15C4.53936 11.15 5.12436 10.565 5.12436 9.86C5.12436 9.14 4.53936 8.555 3.81936 8.555C3.09936 8.555 2.52936 9.14 2.52936 9.86Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </span>
                <span className="fees-price-view">
                  <span>
                    {!isEmpty(buyModalItem)
                      ? (buyModalItem.price / 100) * siteFeeAmount
                      : "---"}{" "}
                    ETH
                  </span>
                </span>
              </div>
              <div className="second-border-div"></div>
              <div className="your-view">
                <span className="bal-text">Your balance</span>
                <span className="bal-div">
                  <span className="bal-value">0 ETH</span>
                </span>
              </div>
              <div className="your-view">
                <span className="bal-text">You will pay</span>
                <span className="bal-div">
                  <span className="bal-value">
                    {!isEmpty(buyModalItem)
                      ? buyModalItem.price +
                        (buyModalItem.price / 100) * siteFeeAmount
                      : "---"}{" "}
                    ETH
                  </span>
                </span>
              </div>
              <div className="your-view">
                <span className="bal-text"></span>
                <span className="bal-div">
                  <span className="bal-value">
                    ≈ $
                    {!isEmpty(buyModalItem)
                      ? Number(
                          (buyModalItem.price +
                            (buyModalItem.price / 100) * siteFeeAmount) *
                            convert_ETHToUSD_Price
                        ).toFixed(2)
                      : "---"}
                  </span>
                </span>
              </div>
            </div>
            <div className="third-section">
              {0 ? (
                <button disabled type="button">
                  Not enough funds for transaction
                </button>
              ) : !isEmpty(buyModalItem) ? (
                buyModalItem.nft.user === props.auth.user.id ? (
                  <button disabled type="button">
                    You are owner
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBuyOffer(buyModalItem)}
                  >
                    Buy Now
                  </button>
                )
              ) : (
                <button disabled type="button">
                  You can't bid
                </button>
              )}
            </div>
          </div>
          <div className="modal_footer">
            <span>
              Need help?{" "}
              <Link to="/contact" target="_blank" rel="noopener noreferrer">
                Support
              </Link>
            </span>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={bidModalFlag}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={"xs"}
        onClose={handleBidModalClose}
      >
        <DialogContent>
          <div className="modal_header">
            <h3 className="title">Make a bid</h3>
            <span className="subtitle">
              You are about to purchase{" "}
              <span>
                {!isEmpty(bidModalItem) ? bidModalItem.nft.title : ""}
              </span>
            </span>
          </div>
          <div className="modal_content">
            <div className="first-section">
              <span className="price-text">Highest Bid Amount</span>
              <span>
                <span className="eth-price">
                  {isEmpty(bidsResult) ? bidModalItem.price : highestBidAmount}{" "}
                  ETH
                </span>{" "}
                &nbsp;
                <span className="currency-price">
                  $
                  {Number(
                    Number(
                      isEmpty(bidsResult)
                        ? bidModalItem.price
                        : highestBidAmount
                    ) * convert_ETHToUSD_Price
                  ).toFixed(2)}
                </span>
              </span>
            </div>
            <div className="bid-input-section">
              <div className="bid-input-view">
                <input
                  type="number"
                  className="bid-input"
                  value={placeBidValue}
                  onChange={(e) => setPlaceBidValue(e.target.value)}
                />
                <span>ETH</span>
              </div>
              {Number(
                isEmpty(bidsResult) ? bidModalItem.price : highestBidAmount
              ) > placeBidValue && (
                <span className="bid-input-error-text">
                  You must set a bid amount higher than the highest bid one.
                </span>
              )}
              <div className="border-div"></div>
            </div>
            <div className="second-section">
              <div className="fees-view">
                <span className="fees-sub-view">
                  <div className="fees-sub-div">
                    <span className="fees-text">Fees({siteFeeAmount}%)</span>
                    <button type="button" className="fees-button">
                      <svg
                        viewBox="0 0 8 12"
                        fill="none"
                        width="8"
                        height="8"
                        xlmns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.65936 7.67C4.65936 6.995 5.01936 6.605 5.54436 6.215L6.11436 5.795C7.01436 5.12 7.56936 4.295 7.56936 3.095C7.56936 1.595 6.35436 0.139999 3.92436 0.139999C1.73436 0.139999 0.429355 1.625 0.429355 3.38C0.429355 3.575 0.444355 3.8 0.489355 4.01L2.58936 4.085C2.57436 4.025 2.54436 3.875 2.54436 3.53C2.54436 2.825 3.05436 2.12 3.92436 2.12C4.82436 2.12 5.25936 2.69 5.25936 3.275C5.25936 3.665 5.12436 4.025 4.71936 4.325L3.95436 4.895C3.09936 5.54 2.81436 6.305 2.81436 7.01C2.81436 7.25 2.82936 7.46 2.87436 7.67H4.65936ZM2.52936 9.86C2.52936 10.565 3.09936 11.15 3.81936 11.15C4.53936 11.15 5.12436 10.565 5.12436 9.86C5.12436 9.14 4.53936 8.555 3.81936 8.555C3.09936 8.555 2.52936 9.14 2.52936 9.86Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </span>
                <span className="fees-price-view">
                  <span>
                    {Number(
                      Number((placeBidValue / 100) * siteFeeAmount).toFixed(4)
                    )}{" "}
                    ETH
                  </span>
                  <span>
                    ≈ $
                    {Number(
                      Number(
                        Number((placeBidValue / 100) * siteFeeAmount).toFixed(4)
                      ) * convert_ETHToUSD_Price
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
              <div className="second-border-div"></div>
              <div className="your-view">
                <span className="bal-text">Your balance</span>
                <span className="bal-div">
                  <span className="bal-value">0 ETH</span>
                </span>
              </div>
              <div className="your-view">
                <span className="bal-text">You will pay</span>
                <span className="bal-div">
                  <span className="bal-value">
                    {Number(
                      Number(
                        Number(placeBidValue) +
                          Number(Number(placeBidValue / 100) * siteFeeAmount)
                      ).toFixed(4)
                    )}{" "}
                    ETH
                  </span>
                  <span className="bal-value">
                    ≈ $
                    {Number(
                      Number(
                        Number(placeBidValue) +
                          Number(Number(placeBidValue / 100) * siteFeeAmount)
                      ) * convert_ETHToUSD_Price
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
            <div className="third-section">
              {0 ? (
                <button disabled type="button">
                  Not enough funds for transaction
                </button>
              ) : !isEmpty(bidModalItem) ? (
                bidModalItem.nft.user === props.auth.user.id ? (
                  <button disabled type="button">
                    You are owner
                  </button>
                ) : Number(
                    isEmpty(bidsResult) ? bidModalItem.price : highestBidAmount
                  ) > placeBidValue ? (
                  <button type="button" disabled>
                    Bid
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBidOffer(bidModalItem)}
                    disabled={props.loading.bidloading}
                  >
                    Bid
                  </button>
                )
              ) : (
                <button disabled type="button">
                  You can't bid now with some error
                </button>
              )}
            </div>
          </div>
          <div className="modal_footer">
            <span>
              Need help?{" "}
              <Link to="/contact" target="_blank" rel="noopener noreferrer">
                Support
              </Link>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

Detailpage.propTypes = {
  handleDetailLoading: PropTypes.func.isRequired,
  handleBidLoading: PropTypes.func.isRequired,
  handleBidForItem: PropTypes.func.isRequired,
  handleBuyForItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  thememode: state.thememode,
  auth: state.auth,
  loading: state.loading,
});

export default connect(mapStateToProps, {
  handleDetailLoading,
  handleBidLoading,
  handleBidForItem,
  handleBuyForItem,
})(Detailpage);

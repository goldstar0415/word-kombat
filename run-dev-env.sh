#!/bin/bash

tmux new-session -d -s dev 
tmux rename-window 'Dev'
tmux select-window -t foo:0

tmux split-window -h 'vifm'
tmux split-window -v -t 0 'gulp'
tmux split-window -v -t 1 'npm start'
tmux select-pane -t 0

subl

tmux -2 attach-session -t dev 

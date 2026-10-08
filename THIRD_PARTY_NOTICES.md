# Third-party notices

## llama.cpp (bundled in the Windows installer)

Daybook bundles the `llama-server` engine from [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp), release b11500, under the MIT License. The full license text is in `licenses/llama.cpp-LICENSE.txt` and is installed with the engine. The Windows build also contains the LLVM OpenMP runtime, whose license (`LICENSE-LLVM-OpenMP`) ships alongside it.

## Qwen3 models (downloaded on request, not bundled)

The built-in AI models are published by the Qwen team (Alibaba Cloud) under the Apache License 2.0:

- https://huggingface.co/Qwen/Qwen3-4B-GGUF
- https://huggingface.co/Qwen/Qwen3-8B-GGUF
- https://huggingface.co/Qwen/Qwen3-30B-A3B-GGUF

Daybook downloads a model only when the user chooses to, from these repositories.
